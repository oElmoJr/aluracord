import { useEffect, useRef, useState } from 'react';

function mergeMessages(current, incoming) {
  return [...new Map([...current, ...incoming].map(m => [m.id, m])).values()]
    .sort((a, b) => BigInt(a.id) > BigInt(b.id) ? -1 : BigInt(a.id) < BigInt(b.id) ? 1 : 0)
    .slice(0, 100);
}

export default function useChat(sala, username) {
  const [messages, setMessages] = useState([]);
  const [hidden, setHidden] = useState([]);
  const [pending, setPending] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const sendingRef = useRef(false);

  useEffect(() => {
    let active = true;
    let timer;
    const controller = new AbortController();
    async function load() {
      try {
        const response = await fetch(`/api/mensagens?sala=${sala}`, { signal: controller.signal, cache: 'no-store' });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Não foi possível carregar as mensagens.');
        if (active) {
          setMessages(current => mergeMessages(current, data.mensagens));
          setError('');
        }
      } catch (err) {
        if (active && err.name !== 'AbortError') setError(err.message);
      } finally {
        if (active) {
          setPending(false);
          timer = setTimeout(load, 3000);
        }
      }
    }
    load();
    return () => { active = false; clearTimeout(timer); controller.abort(); };
  }, [sala]);

  async function send(texto) {
    if (sendingRef.current) return false;
    sendingRef.current = true;
    setSending(true);
    setError('');
    try {
      const response = await fetch(`/api/mensagens?sala=${sala}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ de: username, texto }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Não foi possível enviar a mensagem.');
      setMessages(current => mergeMessages(current, [data.mensagem]));
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      sendingRef.current = false;
      setSending(false);
    }
  }

  return { messages: messages.filter(m => !hidden.includes(m.id)), pending, sending, error,
    send, hide: id => setHidden(current => [...current, id]) };
}

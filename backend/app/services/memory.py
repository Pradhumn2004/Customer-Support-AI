import json
from typing import List, Optional
from backend.app.core.config import get_settings

settings = get_settings()


class MemoryManager:
    def __init__(self):
        self.redis_client = None
        self._in_memory: dict[str, list[dict]] = {}
        self.max_history = 10
        self._try_connect_redis()

    def _try_connect_redis(self):
        try:
            import redis
            self.redis_client = redis.from_url(
                settings.REDIS_URL,
                decode_responses=True,
                socket_connect_timeout=3
            )
            self.redis_client.ping()
        except Exception:
            self.redis_client = None

    def add_message(self, session_id: str, role: str, content: str):
        message = {"role": role, "content": content}
        if self.redis_client:
            try:
                key = f"session:{session_id}:messages"
                self.redis_client.rpush(key, json.dumps(message))
                self.redis_client.ltrim(key, -self.max_history, -1)
                self.redis_client.expire(key, 86400 * 7)
                return
            except Exception:
                self.redis_client = None
        if session_id not in self._in_memory:
            self._in_memory[session_id] = []
        self._in_memory[session_id].append(message)
        self._in_memory[session_id] = self._in_memory[session_id][-self.max_history:]

    def get_history(self, session_id: str) -> List[dict]:
        if self.redis_client:
            try:
                key = f"session:{session_id}:messages"
                messages = self.redis_client.lrange(key, 0, -1)
                return [json.loads(m) for m in messages]
            except Exception:
                self.redis_client = None
        return self._in_memory.get(session_id, [])

    def clear_session(self, session_id: str):
        if self.redis_client:
            try:
                self.redis_client.delete(f"session:{session_id}:messages")
                return
            except Exception:
                self.redis_client = None
        self._in_memory.pop(session_id, None)


memory_manager = MemoryManager()

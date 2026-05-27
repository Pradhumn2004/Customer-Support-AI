import os, time, sys
from dotenv import load_dotenv
load_dotenv('.env')
from langchain_openai import ChatOpenAI

models = [
    'nvidia/nemotron-nano-9b-v2:free',
    'liquid/lfm-2.5-1.2b-instruct:free',
    'z-ai/glm-4.5-air:free',
    'qwen/qwen3-8b-instruct:free',
]
key = os.getenv('OPENROUTER_API_KEY', '')

for model in models:
    try:
        t = time.time()
        llm = ChatOpenAI(model=model, temperature=0, api_key=key, base_url='https://openrouter.ai/api/v1', timeout=30)
        r = llm.invoke('say hi in one word')
        print(f'{model}: OK ({time.time()-t:.1f}s)')
    except Exception as e:
        msg = str(e)[:120]
        print(f'{model}: FAIL - {msg}')

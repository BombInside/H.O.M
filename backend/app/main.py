from fastapi import FastAPI
app=FastAPI(title='HOM API')
@app.get('/api/health')
def health(): return {'ok':True}

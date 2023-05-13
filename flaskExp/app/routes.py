from app import app

@app.route('/')
def index():
    return "hello world"

@app.route("/users",methods=["POST"])
def getUserInfo():
    try:
        pass
    except:
        pass


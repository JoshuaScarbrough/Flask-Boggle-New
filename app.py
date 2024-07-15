from flask import Flask, render_template, session, request, jsonify
from boggle import Boggle

app = Flask(__name__)
app.config["SECRET_KEY"] = "secret"
boggle_game = Boggle()

scoreArray = [0]

@app.route('/')
def home_page():

    createBoard = boggle_game.make_board()
    session['createBoard'] = createBoard
    return render_template("index.html", createBoard=createBoard)

@app.route('/check-word')
def check_word():
    word = request.args["word"]
    createBoard = session['createBoard']
    response = boggle_game.check_valid_word(createBoard, word)
    return jsonify({'result': response})

@app.route("/gameOver")
def game_over():
    score = request.args["score"]
    if(int(score)< 1):
        response = str(max(scoreArray))
        return jsonify({'result': response})
    
    else:
        scoreArray.append(int(score))
        response = str(max(scoreArray))
        return jsonify({'result': response})
    
    



if __name__ == '__main__':
    app.run(debug=True)
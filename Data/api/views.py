from django.shortcuts import render

# Create your views here.

import pickle
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import render
import pandas as pd
from django.conf import settings
import numpy as np
import gensim
from gensim import corpora,models
from konlpy.tag import Mecab
import re
import pymysql


# 모델 load
print ("------------model load-------------")
#model = models.LdaModel.load("./lda.pkl")
with open("./lda.pkl", "rb") as f:
    model = pickle.load(f)
print ("---------master load----------")
dictionary = pd.read_pickle("./lda_dictionary.gensim")

# Create your views here.
@api_view(['GET'])
def index_page(request):
    return_data = {
        "error" : "0",
        "message" : "Successful",
    }
    return Response(return_data)


count = 0
# Create your views here.
@api_view(['GET'])
def encore(request):
    id_ = request.query_params.get("id")
    pass_ = request.query_params.get("pass")
    print (id_, pass_)

    global count
    count += 1
    return_data =  "{},{}<br> {} :: ".format(id_, pass_, count)

    return Response(return_data)

def encore_view(request):
    return render(request, 'ajax01_count.html')

# 불용어 제거  #이 부분이 참 어렵네요 ㅠ.ㅠ
def filter_stopword(x):
    
    stop_word_list = ["안녕","우리","저희"]
    stop_word_filterd_list = []
    for word in x:
        if  (len(word) !=1 ) and (word not in stop_word_list) :
            stop_word_filterd_list.append(word)
             
    return stop_word_filterd_list


@api_view(["POST"])
def predict_model(request):
    boardno = request.data.get("boardNo")
    boardcontent = request.data.get("boardContent")

    m = Mecab()
    #테스트데이터 전처리
    text = re.sub(r"[^\s\w]", " ",boardcontent)
    text = m.nouns(text)
    text = filter_stopword(text)
    
    #테스트하려면 이 딕셔너리가 필요한데, 요 부분 질문!
    new_doc_bow = dictionary.doc2bow(text)
    result = model.get_document_topics(new_doc_bow)
    
    # 테스트데이터에 해당하는 가장 높은 확률의 군집 1개 추출
    result_li = []
    for i in range(len(result)):
        result_li.append(result[i][1])

    return_value = result_li.index(max(result_li))

    # 해당 군집을 db로 보내기
    try:
        conn = pymysql.connect(host="czero.cpauzqw6iiv0.ap-northeast-2.rds.amazonaws.com",port=3306, user="admin", password="1q2w3e4r", db="czero", charset="utf8")
        cur = conn.cursor()
        print("db 연결 성공")
    
        cur.execute(f'update board set cluster_no = "{return_value}" where board_no = "{boardno}" ')
        conn.commit()

    except Exception as e:
        print(e)
    finally:
        conn.close()

        
    return Response("Db저장성공")


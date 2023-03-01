# all endpoints for data
from django.http import JsonResponse
from .models import MyuSers
from .serializers import UserSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@api_view(['GET', 'POST'])
def user_list(request, format = None):
    #get all users
    # serialize them
    ## return json 
    if  request.method == 'GET':
        users = MyuSers.objects.all()
        serializer = UserSerializer(users, many=True)
        return JsonResponse({"users": serializer.data}, safe=False)

    if request.method == 'POST':
        serializer = UserSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)

@api_view(['GET', 'PUT', 'DELETE'])
def user_detail(request, id, format=None):

    try:
        user = MyuSers.objects.get(pk=id)
    except UserSerializer.DoesNotExist:
        return Response(status = status.HTTP_404_NOT_FOUND)    

    if request.method == 'GET':
        serializer = UserSerializer(user)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = UserSerializer(user, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.erors, status = status.HTTP_400_BAD_REQUEST)    
    elif request.method == 'DELETE':
        user.delete()
        return Response(status = status.HTTP_204_NO_CONTENT)

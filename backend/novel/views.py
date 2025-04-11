from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .serializers import NovelSerializer
from .models import Novel
from rest_framework.response import Response
from rest_framework import status

class NovelViewSet(viewsets.ModelViewSet):
    queryset = Novel.objects.all()
    serializer_class = NovelSerializer
    permission_classes = [AllowAny]
    def get_queryset(self):
        queryset = super().get_queryset()
        search = self.request.query_params.get('search')
        if search:
            queryset = queryset.filter(title__icontains=search)
        return queryset
    
@api_view(['POST'])
@permission_classes([AllowAny])
def updateNumFavorite(request, pk):
    try:
        novel = Novel.objects.get(_id = pk)
        novel.numFavorites = novel.numFavorites + 0 + 1
        novel.save()

        serialize = NovelSerializer(novel, many=False)
        return Response(serialize.data, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({'details': f"{e}"}, status=status.HTTP_204_NO_CONTENT)
To link libgomp statically you can do

ln -s `g++ -print-file-name=libgomp.a`
g++ foo.o -static-libgcc -static-libstdc++ -L. -o foo -fopenmp -ljpeg -lopenblas

However your executable will still depend on a pthread dll. The reason you are getting the error is that libc is still linking dynamically. To fix this you have to link libc statically as well

ln -s `g++ -print-file-name=libpthread.a`
ln -s `g++ -print-file-name=libc.a`
g++ foo.o -static-libgcc -static-libstdc++ -L. -o foo -fopenmp -ljpeg -lopenblas
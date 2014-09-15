for F in `ls -1 |awk -F. '{print $1}'`
do
  mv $F.jpg ${F}_$1.jpg
done

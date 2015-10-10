for file in `ls -1 |grep '201510'|grep -v min|sort -r|awk -F. '{print $1}'`
do
    echo \""$file"\",
    #echo mv -v "$file".jpg "${file%20140909*}201409${file#*20140909}".jpg
    #echo mv -v "$file".jpg preg_"${file%_*}".jpg
    # more on parameter expansion http://pubs.opengroup.org/onlinepubs/009695399/utilities/xcu_chap02.html#tag_02_06_02
done
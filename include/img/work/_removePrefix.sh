for file in `ls -1 |grep 'DSC'|sort -r|awk -F. '{print $1}'`
do
    #echo \""$file"\",
    mv -v "$file".jpg pers_"${file%DSC*}201602${file#*DSC}".jpg
    #echo mv -v "$file".jpg fam_"${file%_*}".jpg
    # more on parameter expansion http://pubs.opengroup.org/onlinepubs/009695399/utilities/xcu_chap02.html#tag_02_06_02
done
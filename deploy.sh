set -o nounset
set -o errexit

if [[ "$#" != 0 && "$1" == "-k" ]]; then
    echo
else
    npm run build
fi

# for i in {33..35};do
# 用户名root 密码 password
for i in 99;do
   ssh root@10.0.11."$i" <<EOF
   rm -rf /usr/local/oct/ufm/app/front/ufm
EOF
   scp -r ./ufm root@10.0.11."$i":/usr/local/oct/ufm/app/front/
   ssh root@10.0.11."$i" systemctl restart nginx
done

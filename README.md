# VissionTek

the client side of this application is built with react's CRA 

the backend is build with expressJS's typescript flavor

# technologies being used

please familiarize your self with these technologies before you

    1. React
    2. nodejs 
    3. docker and kubernetes
    4. skaffold
    5. ingress-nginx
    6. typscript

# installations

1. install docker by going to https://docs.docker.com/get-docker/ then enable kubernetes inside docker

2. please also install skaffold by going to https://skaffold.dev/docs/install/

3. install ingress-nginx by going to https://kubernetes.github.io/ingress-nginx/deploy/


# in case you have issues when running skaffold

please clone this repo incase you run into issuess when using skaffold git clone https://github.com/Homebrew/homebrew-core /usr/local/Homebrew/Library/Taps/homebrew/homebrew-core --depth=1

# configuring your local host file

running this application locally will require you to configure you hosts file in /etc/hosts please add 

```bash 
127.0.0.1 vission.dev
```
at the end of the code 

# running this application locally

```bash
skaffold dev
```

then go to vision:

1. vission.dev/auth for the authorization service
2. vission.dev/sales for the sales service
3. vission.dev/purchase for the purchase service
4. vission.dev/dashboard for the dashboard service


# last note

we are using node version 13 explicitly. we will have to change that to have the latest version. we are currently doing that because ts-node-dev is not compatible to version 14 which is the current one. 
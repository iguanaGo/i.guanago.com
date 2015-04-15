# i.guanago.com
Where do you guana go now?

[http://i.guanago.com](http://i.guanago.com)

## Instalación
### Windows
Prerequisitos

- [ruby](http://rubyinstaller.org/downloads/)
- [nodejs y npm](http://blog.teamtreehouse.com/install-node-js-npm-windows)
- [git](https://git-scm.herokuapp.com/download/win)

Desde consola
```sh
npm update -g npm
gem install sass compass
git clone https://github.com/iguanaGo/i.guanago.com.git
git clone https://github.com/iguanaGo/iguanago.github.io
cd i.guanago.com
npm install
bower install
npm install -g grunt grunt-cli
```

### Linux
```sh
sudo apt-get install git nodejs npm
npm update -g npm
gem install sass compass
git clone https://github.com/iguanaGo/i.guanago.com.git
git clone https://github.com/iguanaGo/iguanago.github.io
cd i.guanago.com
npm install
bower install
npm install -g grunt grunt-cli
```

### Si algo falla
```sh
cd i.guanago.com
rm -r node_modules
npm cache clean
npm install
```
### Si están atras de una VPN
```sh
git config --global "https://".insteadOf git://
```

## Desarrollo
```sh
cd i.guanago.com
grunt serve
# editar archivos
# CTRL + C
git add .
git commit -m "razon del cambio"
git push origin master
```

## Actualizar Servidor Producción 
```sh
cd i.guanago.com
grunt
cd dist
cp -r * ../../iguanago.github.io
cd ../../iguanago.github.io
git add .
git commit -m "razon del cambio"
git push origin master
```

# Base de datos
Poner las novedades arriba!

[https://docs.google.com/spreadsheets/d/1MNkEoLahoi_6bjwi0QkU9-SkYirnI_13jaH63k2Ogok/edit#gid=0](https://docs.google.com/spreadsheets/d/1MNkEoLahoi_6bjwi0QkU9-SkYirnI_13jaH63k2Ogok/edit#gid=0)

# Backend Grails
* [https://github.com/iguanaGo/api.guanago.com](https://github.com/iguanaGo/api.guanago.com)
* [http://api.guanago.com](http://api.guanago.com)
* [https://api-guanago-com.herokuapp.com/](https://api-guanago-com.herokuapp.com/)

TODO
----
-

Licencia
----
-

Versión
----
0.1
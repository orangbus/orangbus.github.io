(window.webpackJsonp=window.webpackJsonp||[]).push([[116],{630:function(a,s,e){"use strict";e.r(s);var t=e(11),r=Object(t.a)({},(function(){var a=this,s=a.$createElement,e=a._self._c||s;return e("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[e("p",[a._v("配套仓库地址："),e("a",{attrs:{href:"https://gitee.com/orangbus/mysql-cluster",target:"_blank",rel:"noopener noreferrer"}},[a._v("https://gitee.com/orangbus/mysql-cluster"),e("OutboundLink")],1)]),a._v(" "),e("h1",{attrs:{id:"pxc集群"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#pxc集群"}},[a._v("#")]),a._v(" pxc集群")]),a._v(" "),e("blockquote",[e("p",[a._v("https://hub.docker.com/r/perconalab/percona-xtradb-cluster")])]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("docker pull perconalab/percona-xtradb-cluster\n")])])]),e("p",[a._v("重命名")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("docker tag docker.io/perconalab/percona-xtradb-cluster pxc\n\ndocker rmi docker.io/perconalab/percona-xtradb-cluster\n")])])]),e("h2",{attrs:{id:"_3节点的集群"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_3节点的集群"}},[a._v("#")]),a._v(" 3节点的集群")]),a._v(" "),e("h3",{attrs:{id:"创建网段"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#创建网段"}},[a._v("#")]),a._v(" 创建网段")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("docker network create pxc1\n\ndocker network inspect pxc1\n\ndocker network "),e("span",{pre:!0,attrs:{class:"token function"}},[a._v("rm")]),a._v(" pxc1\n\n//or\n\ndocker network create --subnet"),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),e("span",{pre:!0,attrs:{class:"token number"}},[a._v("127.18")]),a._v(".0.0.0/24 pxc\n")])])]),e("h2",{attrs:{id:"docker卷"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#docker卷"}},[a._v("#")]),a._v(" docker卷")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("docker volume create --name v1\n\ndocker inspect v1\n\ndocker volume "),e("span",{pre:!0,attrs:{class:"token function"}},[a._v("rm")]),a._v(" v1\n")])])]),e("h3",{attrs:{id:"创建一个容器"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#创建一个容器"}},[a._v("#")]),a._v(" 创建一个容器")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("docker run -d -p "),e("span",{pre:!0,attrs:{class:"token number"}},[a._v("3306")]),a._v(":3306\n-v v1:/var/lib/mysql\n-e "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("MYSQL_ROOT_PASSWORD")]),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("admin666\n-e "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("CLUSTER_NAME")]),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("PXC\n-e "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("XTRABACKUP_PASSWORD")]),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("slave666 "),e("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 同步的密码")]),a._v("\n- privileged\n--name"),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("node1\n--net"),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("net1\n--ip"),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),e("span",{pre:!0,attrs:{class:"token number"}},[a._v("172.18")]),a._v(".0.2 pxc\n")])])]),e("h2",{attrs:{id:"创建3节点pxc集群"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#创建3节点pxc集群"}},[a._v("#")]),a._v(" 创建3节点pxc集群")]),a._v(" "),e("h3",{attrs:{id:"网络"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#网络"}},[a._v("#")]),a._v(" 网络")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("docker network create pxc\n")])])]),e("h3",{attrs:{id:"持久存储卷"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#持久存储卷"}},[a._v("#")]),a._v(" 持久存储卷")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("docker volume create --name"),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("v1\ndocker volume create --name"),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("v2\ndocker volume create --name"),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("v3\n")])])]),e("h3",{attrs:{id:"节点"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#节点"}},[a._v("#")]),a._v(" 节点")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("docker run -d -p "),e("span",{pre:!0,attrs:{class:"token number"}},[a._v("3306")]),a._v(":3306\n-v v1:/var/lib/mysql\n-e "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("MYSQL_ROOT_PASSWORD")]),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),e("span",{pre:!0,attrs:{class:"token number"}},[a._v("123456")]),a._v("\n-e "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("CLUSTER_NAME")]),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("PXC\n-e "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("XTRABACKUP_PASSWORD")]),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),e("span",{pre:!0,attrs:{class:"token number"}},[a._v("123456")]),a._v("\n- privileged\n--name"),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("node1\n--net"),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("pxc\n--ip"),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),e("span",{pre:!0,attrs:{class:"token number"}},[a._v("172.18")]),a._v(".0.2 pxc\n\ndocker run -d -p "),e("span",{pre:!0,attrs:{class:"token number"}},[a._v("3307")]),a._v(":3306\n-v v2:/var/lib/mysql\n-e "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("MYSQL_ROOT_PASSWORD")]),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),e("span",{pre:!0,attrs:{class:"token number"}},[a._v("123456")]),a._v("\n-e "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("CLUSTER_NAME")]),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("PXC\n-e "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("XTRABACKUP_PASSWORD")]),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),e("span",{pre:!0,attrs:{class:"token number"}},[a._v("123456")]),a._v("\n-e "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("CLUSTER_JOIN")]),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("node1\n- privileged\n--name"),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("node2\n--net"),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("pxc\n--ip"),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),e("span",{pre:!0,attrs:{class:"token number"}},[a._v("172.18")]),a._v(".0.3 pxc\n\n\ndocker run -d -p "),e("span",{pre:!0,attrs:{class:"token number"}},[a._v("3308")]),a._v(":3306\n-v v3:/var/lib/mysql\n-e "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("MYSQL_ROOT_PASSWORD")]),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),e("span",{pre:!0,attrs:{class:"token number"}},[a._v("123456")]),a._v("\n-e "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("CLUSTER_NAME")]),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("PXC\n-e "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("XTRABACKUP_PASSWORD")]),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),e("span",{pre:!0,attrs:{class:"token number"}},[a._v("123456")]),a._v("\n-e "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("CLUSTER_JOIN")]),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("node1\n- privileged\n--name"),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("node3\n--net"),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("pxc\n--ip"),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),e("span",{pre:!0,attrs:{class:"token number"}},[a._v("172.18")]),a._v(".0.4 pxc\n\n----\ndocker run -d -p "),e("span",{pre:!0,attrs:{class:"token number"}},[a._v("3306")]),a._v(":3306 -v v1:/var/lib/mysql -e "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("MYSQL_ROOT_PASSWORD")]),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),e("span",{pre:!0,attrs:{class:"token number"}},[a._v("123456")]),a._v(" -e "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("CLUSTER_NAME")]),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("PXC -e "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("XTRABACKUP_PASSWORD")]),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),e("span",{pre:!0,attrs:{class:"token number"}},[a._v("123456")]),a._v(" - privileged --name"),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("node1 --net"),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("pxc --ip"),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),e("span",{pre:!0,attrs:{class:"token number"}},[a._v("172.18")]),a._v(".0.2 pxc\n\n------ 实际执行\n\ndocker network create --subnet"),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),e("span",{pre:!0,attrs:{class:"token number"}},[a._v("172.30")]),a._v(".0.0/24 pxc\n\ndocker run -d -p "),e("span",{pre:!0,attrs:{class:"token number"}},[a._v("3316")]),a._v(":3306 -v v1:/var/lib/mysql -e "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("MYSQL_ROOT_PASSWORD")]),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),e("span",{pre:!0,attrs:{class:"token number"}},[a._v("123456")]),a._v(" -e "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("CLUSTER_NAME")]),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("PXC -e "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("XTRABACKUP_PASSWORD")]),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),e("span",{pre:!0,attrs:{class:"token number"}},[a._v("123456")]),a._v(" --privileged --name"),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("node1 --net"),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("pxc --ip"),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),e("span",{pre:!0,attrs:{class:"token number"}},[a._v("172.30")]),a._v(".0.2 pxc\n\ndocker run -d -p "),e("span",{pre:!0,attrs:{class:"token number"}},[a._v("3317")]),a._v(":3306 -v v2:/var/lib/mysql -e "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("MYSQL_ROOT_PASSWORD")]),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),e("span",{pre:!0,attrs:{class:"token number"}},[a._v("123456")]),a._v(" -e "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("CLUSTER_NAME")]),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("PXC -e "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("XTRABACKUP_PASSWORD")]),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),e("span",{pre:!0,attrs:{class:"token number"}},[a._v("123456")]),a._v(" -e "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("CLUSTER_JOIN")]),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("node1 --privileged --name"),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("node2 --net"),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("pxc --ip"),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),e("span",{pre:!0,attrs:{class:"token number"}},[a._v("172.30")]),a._v(".0.3 pxc\n\ndocker run -d -p "),e("span",{pre:!0,attrs:{class:"token number"}},[a._v("3318")]),a._v(":3306 -v v3:/var/lib/mysql -e "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("MYSQL_ROOT_PASSWORD")]),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),e("span",{pre:!0,attrs:{class:"token number"}},[a._v("123456")]),a._v(" -e "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("CLUSTER_NAME")]),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("PXC -e "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("XTRABACKUP_PASSWORD")]),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),e("span",{pre:!0,attrs:{class:"token number"}},[a._v("123456")]),a._v(" -e "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("CLUSTER_JOIN")]),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("node1 --privileged --name"),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("node3 --net"),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("pxc --ip"),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),e("span",{pre:!0,attrs:{class:"token number"}},[a._v("172.30")]),a._v(".0.4 pxc\n\n\n")])])]),e("h1",{attrs:{id:"pxc-故障恢复"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#pxc-故障恢复"}},[a._v("#")]),a._v(" PXC-故障恢复")]),a._v(" "),e("h2",{attrs:{id:"重启"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#重启"}},[a._v("#")]),a._v(" 重启")]),a._v(" "),e("h2",{attrs:{id:"单节点恢复"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#单节点恢复"}},[a._v("#")]),a._v(" 单节点恢复")]),a._v(" "),e("p",[a._v("删除之前的节点，已新节点的方式加入到其他任意一个节点，")])])}),[],!1,null,null,null);s.default=r.exports}}]);
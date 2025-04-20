# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "debian/bookworm64"
  config.vm.provider "virtualbox" do |vb|
    vb.memory = "1024"
    vb.cpus = 1
  end

  ## SCRIPT NODE ##
  config.vm.define "srv-script-1" do |srv|
    srv.vm.hostname = "srv-script-1"
    srv.vm.network "public_network", ip: "192.168.1.240", bridge: "Intel(R) Wi-Fi 6 AX101"
    srv.vm.provision "shell", inline: <<-SHELL
      export DEBIAN_FRONTEND=noninteractive
      echo "nameserver 8.8.8.8" > /etc/resolv.conf
      ip route add default via 192.168.1.254

      apt-get update && apt-get upgrade -y
      apt-get install -y python3 gcc vim

      useradd -m script
      passwd -d script
      chmod 755 /home/script

      deluser script sudo || true
    SHELL
  end

  ## WEB CLUSTER: srv-web-1 ##
  config.vm.define "srv-web-1" do |srv1|
    srv1.vm.hostname = "srv-web-1"
    srv1.vm.network "public_network", ip: "192.168.1.200", bridge: "Intel(R) Wi-Fi 6 AX101"
    srv1.vm.provision "shell", inline: <<-SHELL
      export DEBIAN_FRONTEND=noninteractive
      echo "nameserver 8.8.8.8" > /etc/resolv.conf
      ip route add default via 192.168.1.254
      apt-get update && apt-get upgrade -y
      apt-get install -y apache2 corosync pcs pacemaker vim openssl
      hostnamectl set-hostname srv-web-1
      echo "hacluster:hacluster" | sudo chpasswd
      systemctl enable pcsd corosync pacemaker
      systemctl start pcsd corosync pacemaker
      echo "192.168.1.200 srv-web-1" >> /etc/hosts
      echo "192.168.1.201 srv-web-2" >> /etc/hosts
      sed -i '/^quorum {/a \    two_node: 1' /etc/corosync/corosync.conf
      sudo sed -i '/^totem {/a \    transport: knet' /etc/corosync/corosync.conf   
      sudo sed -i '/nodelist {/,/}/d' /etc/corosync/corosync.conf
      sudo bash -c 'cat <<EOF >> /etc/corosync/corosync.conf
nodelist {
    node {
        name: srv-web-1
        nodeid: 1
        ring0_addr: 192.168.1.200
    }
    node {
        name: srv-web-2
        nodeid: 2
        ring0_addr: 192.168.1.201
    }
}
EOF'
    SHELL
  end

  ## WEB CLUSTER: srv-web-2 ##
  # config.vm.define "srv-web-2" do |srv2|
  #   srv2.vm.hostname = "srv-web-2"
  #   srv2.vm.network "public_network", ip: "192.168.1.201", bridge: "Intel(R) Wi-Fi 6 AX101"
  #   srv2.vm.provision "shell", inline: <<-SHELL
  #     export DEBIAN_FRONTEND=noninteractive
  #     echo "nameserver 8.8.8.8" > /etc/resolv.conf
  #     ip route add default via 192.168.1.254
  #     apt-get update && apt-get upgrade -y
  #     apt-get install -y apache2 corosync pcs pacemaker vim openssl
  #     hostnamectl set-hostname srv-web-2
  #     echo "hacluster:hacluster" | sudo chpasswd
  #     systemctl enable pcsd corosync pacemaker
  #     systemctl start pcsd corosync pacemaker
  #     echo "192.168.1.200 srv-web-1" >> /etc/hosts
  #     echo "192.168.1.201 srv-web-2" >> /etc/hosts
  #   SHELL
  # end

  ## PRIMARY NODE: srv-db-1 ##
  config.vm.define "srv-db-1" do |db1|
    db1.vm.hostname = "srv-db-1"
    db1.vm.network "public_network", ip: "192.168.1.210", bridge: "Intel(R) Wi-Fi 6 AX101"
    db1.vm.provision "file", source: "./init_db.sql", destination: "/tmp/init_db.sql"
    db1.vm.provision "shell", inline: <<-SHELL
      export DEBIAN_FRONTEND=noninteractive
      echo "nameserver 8.8.8.8" > /etc/resolv.conf
      ip route add default via 192.168.1.254
      apt-get update && apt-get upgrade -y
      apt-get install -y postgresql postgresql-contrib vim

      systemctl restart postgresql

      sudo -u postgres createdb coursero
      sudo -u postgres psql -d coursero -f /tmp/init_db.sql
    SHELL
  end
end
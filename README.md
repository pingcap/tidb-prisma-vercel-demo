# Bookshop Demo

Bookshop is a virtual online bookstore application through which you can find books of various categories and rate the books.

You can perform CRUD operations such as viewing book details, adding and deleting ratings, editing book inventory, etc.

> Powered by TiDB Cloud, Prisma and Vercel.

## 🔥 Visit Live Demo

[👉 Click here to visit](https://tidb-prisma-vercel-demo.vercel.app/)

![image](https://user-images.githubusercontent.com/56986964/183592978-42d702eb-b5fc-4285-b081-30a50803fe1a.png)

## Deploy on Vercel

### 🚀 One Click Deploy

You can click the button to quickly deploy this demo if already has an TiDB Cloud cluster with bookshop data imported.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMini256%2Ftidb-prisma-vercel-demo&repository-name=tidb-prisma-demo&env=DATABASE_URL&envDescription=TiDB%20Cloud%20connection%20string&envLink=https%3A%2F%2Fdocs.pingcap.com%2Ftidb%2Fdev%2Fdev-guide-build-cluster-in-cloud&project-name=tidb-prisma-demo)

### 🧑‍🔧 Manually Deploy

#### 1. Register TiDB Cloud and create dev-tier cluster

[Click here to visit TiDB Cloud](https://tidbcloud.com/)

After cluster created, you can get the connection details by clicking the `Connect` button.

![image](https://user-images.githubusercontent.com/56986964/183590385-0e688bac-8c4b-4988-ad02-692650b4c5a8.png)

Get `User` and `Host` field from the dialog.

> Note: For importing initial data from local, you can set an Allow All traffic filter here by entering an IP address of `0.0.0.0/0`.

![image](https://user-images.githubusercontent.com/56986964/183590950-93fb5778-128b-40e1-ab85-33994bd6f4de.png)

Your `DATABASE_URL` should look like `mysql://<User>:<Password>@<Host>:4000/bookshop`

#### 2. Import table structures and data

2.1 Install `TiUP`

TiUP is a component manager for TiDB.

Run the following in your terminal:

```bash
curl --proto '=https' --tlsv1.2 -sSf https://tiup-mirrors.pingcap.com/install.sh | sh
```

2.2 Run `TiUP demo`

> You can get `User` and `Host` from TiDB Cloud panel.

Run the following in your terminal:

```bash
tiup demo bookshop prepare -U <User> -H <Host> -p <Password>
```

> More details about importing table structures and data please refer to our [doc](https://docs.pingcap.com/tidbcloud/dev-guide-bookshop-schema-design#method-1-via-tiup-demo).

#### 3. Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMini256%2Ftidb-prisma-vercel-demo&repository-name=tidb-prisma-demo&env=DATABASE_URL&envDescription=TiDB%20Cloud%20connection%20string&envLink=https%3A%2F%2Fdocs.pingcap.com%2Ftidb%2Fdev%2Fdev-guide-build-cluster-in-cloud&project-name=tidb-prisma-demo)

> You can get `DATABASE_URL` from previous step.

![image](https://user-images.githubusercontent.com/56986964/183592417-4eae4042-9dba-44a4-a741-288f74f365a1.png)

## 📖 Develop Reference

### Prisma

[Prisma Deployment Guide](https://www.prisma.io/docs/guides/deployment/deploying-to-vercel)

### Bookshop Schema

[Bookshop Schema Design](https://docs.pingcap.com/tidbcloud/dev-guide-bookshop-schema-design)

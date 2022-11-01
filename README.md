# Bookshop Demo

Bookshop is a virtual online bookstore application through which you can find books of various categories and rate the books.

You can perform CRUD operations such as viewing book details, adding and deleting ratings, editing book inventory, etc.

> Powered by TiDB Cloud, Prisma and Vercel.

## 🔥 Visit Live Demo

[👉 Click here to visit](https://tidb-prisma-vercel-demo.vercel.app/)

![image](https://user-images.githubusercontent.com/56986964/183592978-42d702eb-b5fc-4285-b081-30a50803fe1a.png)

## Deploy on Vercel

## 🧑‍🍳 Before We Start

1. Create a [TiDB Cloud](https://tidbcloud.com/) account and get your free trial cluster.

2. Import the pre-defined database schema and sample data into your TiDB Cloud cluster [(Guide)](https://docs.pingcap.com/tidbcloud/dev-guide-bookshop-schema-design#method-2-via-tidb-cloud-import).

   - Click `Import Data` ![image](https://user-images.githubusercontent.com/56986964/199159442-0b6fe0da-c92f-47bb-b873-be35569464c3.png)
   - Select SQL File for Data Format.
   - Copy the following Bucket URI and Role ARN to the corresponding input boxes:
     - Bucket URI: `s3://developer.pingcap.com/bookshop/`
     - Role ARN: `arn:aws:iam::494090988690:role/s3-tidb-cloud-developer-access`
   - ![image](https://user-images.githubusercontent.com/56986964/199159665-e97c7c94-91ce-4268-bde8-61744757ea9a.png)
   - Click Next to go to the File and filter step to confirm the information of the files to be imported.
   - Click Next again to go to the Preview step to confirm the preview of the data to be imported.
   - Click Start Import to start the import process and wait for TiDB Cloud to complete the import.

### 🚀 One Click Deploy

You can click the button to quickly deploy this demo if already has an TiDB Cloud cluster with bookshop data imported.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?demo-title=TiDB%20Cloud%20Starter&demo-description=A%20bookstore%20demo%20built%20on%20TiDB%20Cloud%20and%20Next.js.&demo-url=https%3A%2F%2Ftidb-prisma-vercel-demo.vercel.app%2F&demo-image=%2F%2Fimages.ctfassets.net%2Fe5382hct74si%2F2HMASOQn8hQit2IFi2hK3j%2Fcfe7cc2aeba4b8f6760a3ea14c32f707%2Fscreenshot-20220902-160324_-_Chen_Zhen.png&project-name=TiDB%20Cloud%20Starter&repository-name=tidb-cloud-starter&repository-url=https%3A%2F%2Fgithub.com%2Fpingcap%2Ftidb-prisma-vercel-demo&from=templates&integration-ids=oac_coKBVWCXNjJnCEth1zzKoF1j)

> Integration will guide you connect your TiDB Cloud cluster to Vercel.

### 🧑‍🔧 Manually Deploy

#### 1. Get connection details

You can get the connection details by clicking the `Connect` button.

![image](https://user-images.githubusercontent.com/56986964/183590385-0e688bac-8c4b-4988-ad02-692650b4c5a8.png)

Get `User` and `Host` field from the dialog.

> Note: For importing initial data from local, you can set an Allow All traffic filter here by entering an IP address of `0.0.0.0/0`.

![image](https://user-images.githubusercontent.com/56986964/183590950-93fb5778-128b-40e1-ab85-33994bd6f4de.png)

Your `DATABASE_URL` should look like `mysql://<User>:<Password>@<Host>:4000/bookshop`

#### 2. Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fpingcap%2Ftidb-prisma-vercel-demo&repository-name=tidb-prisma-vercel-demo&env=DATABASE_URL&envDescription=TiDB%20Cloud%20connection%20string&envLink=https%3A%2F%2Fdocs.pingcap.com%2Ftidb%2Fdev%2Fdev-guide-build-cluster-in-cloud&project-name=tidb-prisma-vercel-demo)

![image](https://user-images.githubusercontent.com/56986964/199161016-2d236629-bb6a-4e3c-a700-c0876523ca6a.png)

## 📖 Develop Reference

### Prisma

[Prisma Deployment Guide](https://www.prisma.io/docs/guides/deployment/deploying-to-vercel)

### Bookshop Schema

[Bookshop Schema Design](https://docs.pingcap.com/tidbcloud/dev-guide-bookshop-schema-design)

const express = require('express');
const app = express();
const cors = require('cors');
const moment = require('moment');
require('dotenv').config();

const port = process.env.PORT || 5000;

/* Middlewares */
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://minhazesiraz:VFOLix62KT0t5DL2@minhazesiraz.vnljkwg.mongodb.net/?retryWrites=true&w=majority&appName=minhazesiraz";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//    serverApi: {
//       version: ServerApiVersion.v1,
//       strict: true,
//       deprecationErrors: true,
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//    }
// });

/* Create a MongoClient with a MongoClientOptions object to set the Stable API version */
const client = new MongoClient(uri, {
   serverApi: {
      version: ServerApiVersion.v1,
      strict: false,
      deprecationErrors: true,
   }
});


async function run() {
   try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();

      const database = client.db('hobbie_s');
      const usersGathering = database.collection('users');
      const blogsGathering = database.collection('blogs');

      /* Users */
      app.get("/users", async (req, res) => {
         const result = await usersGathering.find().toArray();
         res.send(result);
      })

      app.get("/users/designate/:uid", async (req, res) => {
         const uid = req.params.uid;
         const query = { _id: new ObjectId(uid) };
         const result = await usersGathering.findOne(query);
         res.send(result);
      })

      app.post("/users", async (req, res) => {
         const user = req.body;
         const query = { email: user.email }
         const existingUser = await usersGathering.findOne(query);
         if (existingUser) {
            return res.send({ message: "User already exists.", insertedId: null })
         }
         const result = await usersGathering.insertOne(user);
         res.send(result);
      })

      app.patch("/users/designate/:uid", async (req, res) => {
         const job = req.body;
         const uid = req.params.uid;
         const filter = { _id: new ObjectId(uid) };
         const updateDoc = {
            $set: {
               role: job.role,
            }
         }
         const result = await usersGathering.updateOne(filter, updateDoc);
         res.send(result);
      })

      app.delete("/users/:uid", async (req, res) => {
         const uid = req.params.uid;
         const query = { _id: new ObjectId(uid) }
         const result = await usersGathering.deleteOne(query);
         res.send(result);
      })

      /* Blogs */
      /*
      app.get("/blogs", async (req, res) => {
         const result = await blogsGathering.find().toArray();
         res.send(result);
      })
      */

      /* Create indexes - strict: false */
      await blogsGathering.createIndexes([
         { key: { title: 'text', description: 'text' } },
         /* Additional indexes can be created here */
      ]);

      app.get("/blogs", async (req, res) => {
         const { page = 1, limit = 10, q = '' } = req.query;
         const skip = (page - 1) * limit;
         const query = q ? { $text: { $search: q.toLowerCase() } } : {};

         try {
            const totalBlogs = await blogsGathering.countDocuments(query);
            const blogs = await blogsGathering.find(query)
               .skip(skip)
               .limit(parseInt(limit))
               .toArray();

            res.send({
               blogs,
               totalPages: Math.ceil(totalBlogs / limit),
               currentPage: parseInt(page),
            });
         } catch (error) {
            res.status(500).send({ message: error.message });
         }
      });

      app.get("/blogs/posts/:pid", async (req, res) => {
         const pid = req.params.pid;
         const query = { _id: new ObjectId(pid) }
         const result = await blogsGathering.findOne(query);
         res.send(result);
      })

      app.post("/blogs/create-a-posts", async (req, res) => {
         const job = req.body;
         const result = await blogsGathering.insertOne(job);
         res.send(result);
      })

      app.put("/blogs/edited-a-posts/:pid", async (req, res) => {
         const blog = req.body;
         const pid = req.params.pid;
         console.log(pid);
         console.log(blog);
         const filter = { _id: new ObjectId(pid) };
         const updateDoc = {
            $set: {
               title: blog.title,
               description: blog.description,
               image: blog.image,
               category: blog.category,
               author: blog.author,
               authorImage: blog.authorImage,
               date: moment().format('MMMM Do YYYY, h:mm:ss a')
            }
         }
         const result = await blogsGathering.updateOne(filter, updateDoc);
         res.send(result);
      })

      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
   } finally {
      // Ensures that the client will close when you finish/error
      // await client.close();
   }
}
run().catch(console.dir);

app.get('/', (req, res) => {
   res.send('Hello World!')
})

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)
})
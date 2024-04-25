// pages/api/leads.js
import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const client = await clientPromise;
      const db = client.db('mydatabase'); // Change 'mydatabase' to your database name

      const { name, email } = req.body;
      const result = await db.collection('leads').insertOne({ name, email });

      res.status(200).json({ message: 'Lead saved successfully', _id: result.insertedId });
    } catch (error) {
      console.error('MongoDB error:', error);
      res.status(500).send('Failed to save lead');
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

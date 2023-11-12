import express, {Request, Response} from 'express';
import * as path from 'path';
import {Resend} from 'resend';
import {createClient} from '@supabase/supabase-js'
import {type BroadLog} from "./services/email/email-service";

require('dotenv').config({path: path.resolve(__dirname, '../.env.local')});
import cors from 'cors';
import createEmailService from "./services/email/email-service";
import createResendProvider from "./services/email/providers/resend-provider";


const supabaseUrl = process.env.PUBLIC_SUPABASE_URL
const supabaseKey = process.env.PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing env vars: supabaseUrl or supabaseKey')
}

const supabase = createClient(supabaseUrl, supabaseKey, {db: {schema: 'open_campaign'}})


const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3000;

app.use(express.static(path.join(__dirname, '..', 'webapp')));
app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '..', 'webapp', 'index.html'));
});


if (!process.env.RESEND_API_KEY) {
    throw new Error('Missing env var: RESEND_API_KEY')
}

const emailService = createEmailService(createResendProvider({apiKey: process.env.RESEND_API_KEY}))


app.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

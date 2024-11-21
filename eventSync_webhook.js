const express = require('express');
const { exec } = require('child_process');
const bodyParser = require('body-parser');

const app = express();
const PORT = 4000;
const REPO_PATH = '/home/ubuntu/evt-mng-be';

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Endpoint for GitHub webhook
app.post('/webhook', (req, res) => {
    // Verify the webhook payload (optional)
    // You can add a secret to your webhook settings in GitHub and check it here

    // Pull the latest changes
    exec('git pull origin main', { cwd: REPO_PATH }, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error pulling repo: ${stderr}`);
            return res.status(500).send('Error pulling repo');
        }
        console.log(`Repo pulled: ${stdout}`);
        
        // Run your npm command
        exec('npm run push', { cwd: REPO_PATH }, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error running npm command: ${stderr}`);
                return res.status(500).send('Error running npm command');
            }
            console.log(`NPM command output: ${stdout}`);
            return res.status(200).send('Webhook processed successfully');
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

import * as express from 'express/index';
import * as cors from 'cors';
import { Injectable } from '@angular/core';

const SERVER_PORT = 8000;

@Injectable()
export class LocalFileServer {
    private readonly server = express();

    public urlFromPath(path: string) {
        return `http://localhost:${SERVER_PORT}/file?path=${path}`;
    }

    public serve() {
        this.server.use(cors());

        this.server.get('/file', (req, res) => {
            const filePath: string = req.query.path;
            res.sendFile(filePath);
        });

        this.server.listen(SERVER_PORT, () => console.log(`Local file server listening on port ${SERVER_PORT}`));
    }
}

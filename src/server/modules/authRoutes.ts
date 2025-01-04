const { Router } = require('express');
import { JsonWebKey } from 'crypto';
import userModel from '../DB/models/user.model';

const router = Router()
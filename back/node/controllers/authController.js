import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import User from '../models/userSchema.js'
import Instructor from '../models/instructorSchema.js'
import Student from '../models/studentSchema.js'
import Ta from '../models/taSchema.js'
import sendEmail from '../utils/sendEmail.js'

import express from 'express';
import { loadSignIn, loadHome, loadAddStudent, signIn, signOut, addStudent, loadEditStudent, editStudent, deleteStudent } from '../controllers/controller';

const router = express.Router();

router.get('/', loadSignIn); 
router.post('/sign-in', signIn);

router.get('/home', loadHome);
router.get('/add-student', loadAddStudent);
router.get('/edit-student/:id', loadEditStudent);

router.post('/add-student', addStudent);
router.post('/sign-out', signOut);
router.patch('/edit-student/:id', editStudent);
router.delete('/delete-student/:id', deleteStudent);

export default router;

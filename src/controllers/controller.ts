import { Request, Response } from 'express';
import asyncHandler from '../middlewares/asyncHandler'; 
import Student from '../models/model';

export const loadSignIn = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    res.status(200).render('sign-in');
});

export const loadHome = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const students = await Student.find({});
    res.status(200).render('home', { students });
});

export const loadAddStudent = asyncHandler(async(req:Request, res:Response): Promise<void> => {
    res.status(200).render('add-student', { error: null });
});

export const signIn = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { username, password } = req.body;

    if (username !== 'yadu@2005' || password !== '123asd') {
        return res.status(400).json({ error: 'Username or password is incorrect' });
    }

    res.redirect('/home');
});


export const addStudent = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { name, class: studentClass, division, gender } = req.body;
    
    if (!name || !studentClass || !division || !gender) {
        return res.status(400).render('add-student', { error: 'All fields are required.' });
    }
    
    if (!/^[A-Za-z\s]+$/.test(name)) {
        return res.status(400).render('add-student', { error: 'Name can only contain letters and spaces.' });
    }
    
    const newStudent = new Student({
        name,
        class: studentClass,
        division,
        gender
    });
    
    try {
        await newStudent.save();
        res.redirect('/add-student?success=true'); 
    } catch (err) {
        console.error('Error saving student:', err);
        res.status(500).render('add-student', { error: 'An error occurred while adding the student.' });
    }
});

export const loadEditStudent = asyncHandler(async(req: Request, res: Response): Promise<any> => {
    const { id } = req.params; 
    
    try {
        const student = await Student.findById(id);
        if (!student) {
            return res.status(404).send('Student not found');
        }
        res.status(200).render('edit-student', { student });
    } catch (err) {
        console.error('Error fetching student:', err);
        res.status(500).send('Internal Server Error');
    }
});

export const editStudent = asyncHandler(async(req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const { name, class: studentClass, division, gender } = req.body;

    if (!name || !studentClass || !division || !gender) {
        return res.status(400).render('edit-student', { error: 'All fields are required.', student: { _id: id, name, class: studentClass, division, gender } });
    }

    if (!/^[A-Za-z\s]+$/.test(name)) {
        return res.status(400).render('edit-student', { error: 'Name can only contain letters and spaces.', student: { _id: id, name, class: studentClass, division, gender } });
    }

    try {
        const student = await Student.findByIdAndUpdate(id, {
            name,
            class: studentClass,
            division,
            gender
        }, { new: true });

        if (!student) {
            return res.status(404).send('Student not found');
        }

        res.redirect('/home');
    } catch (err) {
        console.error('Error updating student:', err);
        res.status(500).render('edit-student', { error: 'An error occurred while updating the student.', student: { _id: id, name, class: studentClass, division, gender } });
    }
});


export const deleteStudent = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    
    try {
        const student = await Student.findByIdAndDelete(id);
        
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        
        res.status(200).json({ success: 'Student deleted successfully' });
    } catch (err) {
        console.error('Error deleting student:', err);
        res.status(500).json({ error: 'An error occurred while deleting the student' });
    }
});

export const signOut = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    res.redirect('/');
});

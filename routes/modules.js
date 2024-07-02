import express from 'express'
import { Modules } from '../models/Modules.js'
import dotenv from 'dotenv'

dotenv.config();

const router = express.Router()

router.get("/getModules", async(req, res) => {
    try {
        const users = await Modules.find();
        res.json(users)
    } catch (error) {
        console.log(error)
    }
})

router.get("/:id/getModulesByID", async(req, res) => {
    try {
        const users = await Modules.findById(req.params.id);
        res.json(users)
    } catch (error) {
        console.log(error)
        return res.status(404).json
    }
})

router.post('/addModules' , async (req, res) => {
    const module = new Modules(req.body)
    try {
        const insertModule = await module.save()
        res.status(201).json(insertModule)
    } catch (error) {
        console.log(error)
        return res.status(400).json({message : "terjadi kesalahan saat menambah module"})
    }
})


router.patch('/:id/updateModule' , async (req, res) => {
    try {
        const updateModule = await Modules.updateOne({_id:req.params.id}, {$set : req.body})
        res.status(201).json({message : "berhasil mengupdate", updateModule})
    } catch (error) {
        console.log(error)
        return res.status(400).json({message: "terjadi kesalahan"})
    }
})

router.delete('/:id/deleteModule' , async (req, res) => {
    try {
        const deleteModule = await Modules.deleteOne({_id:req.params.id})
        res.status(201).json({message : "berhasil menghapus", deleteModule})
    } catch (error) {
        console.log(error)
        return res.status(400).json({message: "terjadi kesalahan"})
    }
})



export {router as ModulesRouter}
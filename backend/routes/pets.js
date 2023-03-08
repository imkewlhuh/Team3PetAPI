import express from "express";
import { prisma } from "../db/index.js";

export default function petRouter(passport) {
    const router = express.Router();

    //Get all pets by owner
    router.get("/", async (_req, res) => {
        try {
            const pets = await prisma.pet.findMany({
                orderBy: {
                    ownerId: 'asc'
                }
            });

            if (pets) {
                res.status(200).json({
                    success: true,
                    pets
                });
            };
        } catch (e) {
            res.status(500).json({
                success: false,
                message: "Could not find pets"
            });
        };
    });

    //Get pets from logged in user
    router.get(
        "/user",
        passport.authenticate("jwt", { session: false }),
        async (req, res) => {
            try {
                const pets = await prisma.pet.findMany({
                    where: {
                        ownerId: req.user.id
                    }
                });

                if (pets) {
                    res.status(200).json({
                        success: true,
                        pets
                    });
                };
            } catch (e) {
                res.status(500).json({
                    success: false,
                    message: "You must be logged in!"
                });
            };
        });

    //Get pet by id
    router.get("/:petId", async (req, res) => {
        const id = req.params.petId;

        try {
            const pet = await prisma.pet.findFirstOrThrow({
                where: {
                    id: parseInt(id)
                }
            });

            if (pet) {
                res.status(200).json({
                    success: true,
                    pet
                });
            };
        } catch (e) {
            res.status(500).json({
                success: false,
                message: "Could not find pet"
            });
        };
    });

    //Get pet by species
    router.get("/species/:petSpecies", async (req, res) => {
        const species = req.params.petSpecies;

        try {
            const pets = await prisma.pet.findMany({
                where: {
                    species: species
                }
            });

            if (pets) {
                res.status(200).json({
                    success: true,
                    pets
                });
            };
        } catch (e) {
            res.status(500).json({
                success: false,
                message: "Could not find species"
            });
        };
    });

    //Add new pet to logged in user
    router.post(
        "/new",
        passport.authenticate("jwt", { session: false }),
        async (req, res) => {
            try {
                const newPet = await prisma.pet.create({
                    data: {
                        name: req.body.name,
                        species: req.body.species,
                        ownerId: req.user.id
                    }
                });

                if (newPet) {
                    res.status(201).json({
                        success: true
                    });
                };
            } catch (e) {
                res.status(500).json({
                    success: false,
                    message: "Failed to add"
                });
            };
        });

    //Update pet from logged in user
    router.put(
        "/:petId",
        passport.authenticate("jwt", { session: false }),
        async (req, res) => {
            const id = req.params.petId;

            try {
                const pet = await prisma.pet.findFirstOrThrow({
                    where: {
                        id: parseInt(id),
                        ownerId: req.user.id
                    }
                });

                if (pet) {
                    const updatedPet = await prisma.pet.update({
                        where: {
                            id: parseInt(id)
                        },
                        data: {
                            name: req.body.name,
                            species: req.body.species
                        }
                    });

                    if (updatedPet) {
                        res.status(200).json({
                            success: true
                        });
                    } else {
                        res.status(500).json({
                            success: false,
                            message: "Failed to update pet"
                        });
                    };
                };
            } catch (e) {
                res.status(500).json({
                    success: false,
                    message: "Could not find pet"
                });
            };
        });

    //Delete all pets from logged in user
    router.delete(
        "/user",
        passport.authenticate("jwt", { session: false }),
        async (req, res) => {

            try {
                const deletePets = await prisma.pet.deleteMany({
                    where: {
                        ownerId: req.user.id
                    }
                });

                if (deletePets) {
                    res.status(200).json({
                        success: true
                    });
                } else {
                    res.status(500).json({
                        success: false,
                        message: "Failed to delete pets"
                    });
                };
            } catch (e) {
                res.status(500).json({
                    success: false,
                    message: "Could not find pets"
                });
            };
        });

    //Delete pet from logged in user
    router.delete(
        "/:petId",
        passport.authenticate("jwt", { session: false }),
        async (req, res) => {
            const id = req.params.petId;

            try {
                    const deletePet = await prisma.pet.delete({
                        where: {
                            id: parseInt(id)
                        }
                    });

                    if (deletePet) {
                        res.status(200).json({
                            success: true
                        });
                    } else {
                        res.status(500).json({
                            success: false,
                            message: "Failed to delete pet"
                        });
                    };
                } catch (e) {
                res.status(500).json({
                    success: false,
                    message: "Could not find pet"
                });
            };
        });
        
    return router;
}
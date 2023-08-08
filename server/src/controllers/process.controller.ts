import { Request, Response} from 'express';
import db from '../config/database';

export const createProcess = async (req: Request, res: Response): Promise<void> => {
  try {
    const { 
      dataproc, 
      titulo, 
      numero, 
      vara, 
      requerente, 
      requerido, 
      objeto,
      tel,
      cpf
    } = req.body;
    const { rows } = await db.query(
      `INSERT INTO 
      processos 
      (dataproc, titulo, numero, vara, requerente, requerido, objeto, tel, cpf) 
      VALUES 
      ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [dataproc, titulo, numero, vara, requerente, requerido, objeto, tel, cpf]
    );
    
    res.status(201).send({
      message: "Process added successfully!",
      body: {
        processo: { dataproc, titulo, numero, vara, requerente, requerido, objeto, tel, cpf }
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error creating process:", error);
      res.status(500).send({
        message: "An error occurred while creating the process.",
        error: error.message
      });
    } else {
      res.status(500).send({
        message: "An unknown error occurred while creating the process."
      });
    }
  }
};

export const listAllProcess = async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await db.query(`SELECT * FROM processos`);
    res.status(200).send(response.rows);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error listing process:", error);
      res.status(500).send({
        message: "An error occurred while listing the process.",
        error: error.message
      });
    } else {
      res.status(500).send({
        message: "An unknown error occurred while listing the process."
      });
    }
  }
};

export const findProcessById = async (req: Request, res: Response): Promise<void> => {
  try {
    const processId: number = parseInt(req.params.id);
    const response = await db.query(`SELECT * FROM processos WHERE id = $1`, [processId]);
    res.status(200).send(response.rows);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error finding process:", error);
      res.status(500).send({
        message: "An error occurred while finding the process.",
        error: error.message
      });
    } else {
      res.status(500).send({
        message: "An unknown error occurred while finding the process."
      });
    }
  }
};
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

export const findProcessByNumber = async (req: Request, res: Response): Promise<void> => {
  try {
    const processNumber: number = parseInt(req.params.number);
    console.log(processNumber);
    
    const response = await db.query(`
    SELECT 
    dataproc, 
    TRIM(titulo) as titulo,
    numero, 
    TRIM(vara) as vara, TRIM(requerente) as requerente, TRIM(requerido) as requerido, TRIM(objeto) as objeto,
    tel,cpf 
    FROM processos 
    WHERE numero = $1`, [processNumber]);
    if(response.rowCount == 0) {
      res.status(400).send({message: 'Nenhum registro encontrado'});  
    } else {
      res.status(200).send(response.rows);
    }
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

export const updateProcessById = async (req: Request, res: Response): Promise<void> => {
  try {
    const processId: number = parseInt(req.params.id);
    const { dataproc, 
      titulo, 
      numero, 
      vara, 
      requerente, 
      requerido, 
      objeto,
      tel,
      cpf } = req.body;
    
    const response = await db.query(`UPDATE processos SET dataproc=$1, titulo=$2, numero=$3, vara=$4, requerente=$5, requerido=$6, objeto=$7, tel=$8, cpf=$9 WHERE id=$10`, [dataproc, 
      titulo, 
      numero, 
      vara, 
      requerente, 
      requerido, 
      objeto,
      tel,
      cpf,
      processId]);

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

export const deleteProcessById = async (req: Request, res: Response): Promise<void> => {
  try {
    const processId: number = parseInt(req.params.id);
    console.log(processId);
    
    const response = await db.query(`DELETE processos WHERE id=$1`, [processId]);
    
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
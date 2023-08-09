import { Request, Response} from 'express';
import db from '../config/database';
const tableName = 'evolucao'

export const createEvolution = async (req: Request, res: Response): Promise<void> => {
  try {
    const { data,titulo,descricao,id_processo } = req.body;
    const { rows } = await db.query(
      `INSERT INTO 
      ${tableName} 
      (data,titulo,descricao,id_processo) 
      VALUES 
      ($1, $2, $3, $4)`,
      [data,titulo,descricao,id_processo]
    );
    
    res.status(201).send({
      message: "Process added successfully!",
      body: {
        processo: { data,titulo,descricao,id_processo }
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

export const listAllEvolutions = async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await db.query(`SELECT * FROM ${tableName}`);
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

export const findEvolutionById = async (req: Request, res: Response): Promise<void> => {
  try {
    const evolutionId: number = parseInt(req.params.id);
    
    const response = await db.query(`
    SELECT id, data, TRIM(titulo) AS titulo, TRIM(descricao) AS descricao, id_processo 
    FROM ${tableName} 
    WHERE id = $1`, [evolutionId]
    );
    if(response.rowCount == 0) {
      res.status(400).send({message: 'Nenhum registro encontrado'});  
    } else {
      res.status(200).send(response.rows);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error finding process:", error);
      res.status(500).send({
        message: "An error occurred while finding the evolution.",
        error: error.message
      });
    } else {
      res.status(500).send({
        message: "An unknown error occurred while finding the evolution."
      });
    }
  }
};

export const updateEvolutionById = async (req: Request, res: Response): Promise<void> => {
  try {
    const evolutionId: number = parseInt(req.params.id);
    const { data,titulo,descricao,id_processo } = req.body;
    
    const response = await db.query(`UPDATE ${tableName} SET data=$1,titulo=$2,descricao=$3,id_processo=$4 WHERE id=$5`, 
    [data,titulo,descricao,id_processo, evolutionId]);

    res.status(200).send(response.rows);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error finding process:", error);
      res.status(500).send({
        message: "An error occurred while finding the evolution.",
        error: error.message
      });
    } else {
      res.status(500).send({
        message: "An unknown error occurred while finding the evolution."
      });
    }
  }
};

export const deleteEvolutionById = async (req: Request, res: Response): Promise<void> => {
  try {
    const evolutionId: number = parseInt(req.params.id);
    
    const response = await db.query(`DELETE ${tableName} WHERE id=$1`, [evolutionId]);
    
    res.status(200).send(response.rows);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error finding evolution:", error);
      res.status(500).send({
        message: "An error occurred while finding the evolution.",
        error: error.message
      });
    } else {
      res.status(500).send({
        message: "An unknown error occurred while finding the evolution."
      });
    }
  }
};
import { Request, Response } from 'express';
import db       from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

interface ScheduleItem
{
    week_day : number;
    from     : string;
    to       : string;
}

export default class ClassesController
{

    async index(request : Request, response : Response)
    {

        // recebe os parâmetros 
        const filters  = request.query;
        
        // converte os parâmetros em strings
        const subject  = filters.subject  as string;
        const week_day = filters.week_day as string;
        const time     = filters.time     as string;

        // verifica se os filtros da pesquisa foram passados
        if (!filters.week_day || !filters.subject || !filters.time)
        {
            return response.status(400).json(
            {
                error: 'Missing filters to search classes'
            })
        }

        // converte a hora em minutos (as string define que o campo é uma string)
        const timeInMinutes = convertHourToMinutes(time);

        // faz a pesquisa no banco de dados com 'where'
        const classes = await db('classes')
                              .whereExists(function()
                              {
                                 this.select('class_schedule.*')      
                                     .from('class_schedule')
                                     .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                                     .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                                     .whereRaw('`class_schedule`.`from` <= ??'   , [Number(timeInMinutes)])
                                     .whereRaw('`class_schedule`.`to` > ??'      , [Number(timeInMinutes)])
                              })
                              .where('classes.subject', '=', subject)
                              .join('users', 'classes.user_id', '=', 'users.id')
                              .select(['classes.*', 'users.*']);

        return response.json(classes);

    }

    async create (request: Request, response: Response)
    {
        
        // desestruturação do json em variáveis
        const 
        {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = request.body;
        
        // inicia uma nova transação
        const trx = await db.transaction();
    
        try 
        {
        
        // await aguarda a Promise ser executada para continuar o processamento
    
        // inclui o usuário
        const insertedUsersIds = await trx('users').insert(
            {
                name, avatar, whatsapp, bio
            });
        
            // armazena o id gerado na tabela users
            const user_id = insertedUsersIds[0];
        
            // inclui a classe
            const insertedClassesIds = await trx('classes').insert(
            {
                subject, cost, user_id
            });
        
            // armazena o id gerado na tabela classes
            const class_id = insertedClassesIds[0];
        
            // converte cada item do array schedule, em um novo objeto
            const classSchedule = schedule.map((scheduleItem: ScheduleItem) =>
            {
                return {
                    class_id,
                    week_day : scheduleItem.week_day,
                    from     : convertHourToMinutes(scheduleItem.from),
                    to       : convertHourToMinutes(scheduleItem.to),
                };
            });
        
            // agendamento das aulas
            await trx('class_schedule').insert(classSchedule);
        
            // comita a transação
            await trx.commit();
        
            // resposta
            // 201 - criado com sucesso
            return response.status(201).send();
    
        } 
        catch (error) 
        {
            await trx.rollback();
            console.log(error);
            return response.status(400).json({error: 'Unexpected error while creating new class'})
        }
    
    }

}
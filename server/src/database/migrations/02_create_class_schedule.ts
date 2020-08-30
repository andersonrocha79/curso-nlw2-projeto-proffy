import Knex from 'knex';

// knexjs.org
// migrations API

export async function up(knex: Knex)
{

    // alterações do banco de dados
    return knex.schema.createTable('class_schedule', table =>
    {
        table.increments('id').primary();
        table.integer('week_day').notNullable();
        table.integer('from').notNullable();
        table.integer('to').notNullable();
        table.integer('class_id')
             .notNullable()
             .references('id')
             .inTable('classes')
             .onUpdate('CASCADE')
             .onDelete('CASCADE');
    });

}

export async function down(knex: Knex)
{

    // se ocorrer erro, o que fazer 
    return knex.schema.dropTable('class_schedule')

}
import Knex from 'knex';

// knexjs.org
// migrations API

export async function up(knex: Knex)
{

    // alterações do banco de dados
    return knex.schema.createTable('users', table =>
    {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('avatar').notNullable();
        table.string('whatsapp').notNullable();                
        table.string('bio').notNullable();                

    });

}

export async function down(knex: Knex)
{

    // se ocorrer erro, o que fazer 
    return knex.schema.dropTable('users')

}
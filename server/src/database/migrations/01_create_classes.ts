import Knex from 'knex';

// knexjs.org
// migrations API

export async function up(knex: Knex)
{

    // alterações do banco de dados
    return knex.schema.createTable('classes', table =>
    {
        table.increments('id').primary();
        table.string('subject').notNullable();
        table.decimal('cost').notNullable();
        table.integer('user_id')
             .notNullable()
             .references('id')
             .inTable('users')
             .onUpdate('CASCADE')
             .onDelete('CASCADE');
    });

}

export async function down(knex: Knex)
{

    // se ocorrer erro, o que fazer 
    return knex.schema.dropTable('classes')

}
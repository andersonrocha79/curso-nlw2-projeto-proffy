import Knex from 'knex';

// knexjs.org
// migrations API

export async function up(knex: Knex)
{

    // alterações do banco de dados
    return knex.schema.createTable('connections', table =>
    {
        table.increments('id').primary();
        table.integer('user_id')
             .notNullable()
             .references('id')
             .inTable('users')
             .onUpdate('CASCADE')
             .onDelete('CASCADE');
        table.timestamp('created_at')
             .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
             .notNullable();
    });

}

export async function down(knex: Knex)
{

    // se ocorrer erro, o que fazer 
    return knex.schema.dropTable('connections')

}
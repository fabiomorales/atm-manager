import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('customer', table => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));

    table.string('fisrt_name').notNullable();
    table.string('last_name').notNullable();
    table.string('email').notNullable().unique();
    table.string('cpf').notNullable().unique();
    table.decimal('balance').notNullable();

    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.timestamp('deleted_at');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('customer');
}

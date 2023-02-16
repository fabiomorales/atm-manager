import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('atm', table => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));

    table.string('identification').notNullable().unique();
    table.integer('qtd_ten_bill').notNullable();
    table.integer('qtd_twenty_bill').notNullable();
    table.integer('qtd_fifty_bill').notNullable();
    table.integer('qtd_hundred_bill').notNullable();
    table.integer('total_bill').notNullable();

    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.timestamp('deleted_at');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('atm');
}

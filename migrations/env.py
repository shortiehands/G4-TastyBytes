from logging.config import fileConfig

from sqlalchemy import engine_from_config
from sqlalchemy import pool
from app.db.session import Base
from app.models.recipe import Recipe
from alembic import context

# this is the Alembic Config object, which provides
# access to the values within the .ini file in use.
config = context.config
fileConfig(config.config_file_name)

   # Set the target metadata to Base.metadata
target_metadata = Base.metadata

def run_migrations_offline():
       """Run migrations in 'offline' mode."""
       context.configure(
           url=config.get_main_option("sqlalchemy.url"),
           target_metadata=target_metadata,
           literal_binds=True,
           compare_type=True
       )
       with context.begin_transaction():
           context.run_migrations()

def run_migrations_online():
       """Run migrations in 'online' mode."""
       connectable = engine_from_config(
           config.get_section(config.config_ini_section),
           prefix="sqlalchemy.",
           poolclass=pool.NullPool,
       )

       with connectable.connect() as connection:
           context.configure(connection=connection, target_metadata=target_metadata,compare_type=True)

           with context.begin_transaction():
               context.run_migrations()

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
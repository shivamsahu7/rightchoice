import { seedUsers } from './user.seeder'

async function runSeeders() {
  try {
    console.log('Starting database seeding...')
    
    await seedUsers()
    
    console.log('✅ All seeders completed successfully')
    process.exit(0)
  } catch (error) {
    console.error('❌ Seeding failed:', error)
    process.exit(1)
  }
}

runSeeders()

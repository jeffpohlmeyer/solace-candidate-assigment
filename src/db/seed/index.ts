(async () => {
  try {
    const { db } = await import('@/db');
    const { advocates } = await import('@/db/schema');
    const { advocateData } = await import('@/db/seed/advocates');

    console.log('Removing existing advocates...');
    await db.delete(advocates);
    console.log('Previous advocates deleted');

    console.log('Seeding advocates...');
    await db.insert(advocates).values(advocateData);
    console.log(`Successfully seeded ${advocateData.length} advocates`);
    console.log('Database seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Database seeding failed:', error);
    process.exit(1);
  }
})();

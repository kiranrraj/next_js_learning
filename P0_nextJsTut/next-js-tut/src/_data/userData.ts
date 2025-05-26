// Sample mock data
export const users = [
  { id: '1', name: 'Alice', age: 30 },
  { id: '2', name: 'Bob', age: 25 },
  { id: '3', name: 'Charlie', age: 40 },
]

// Utility function to fetch a user
export function getUserById(id: string) {
  return users.find(user => user.id === id)
}

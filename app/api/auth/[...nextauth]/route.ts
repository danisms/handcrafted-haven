// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config'; // Adjust path as needed
import { handlers } from '@/auth'; // Import from your auth.ts

export const { GET, POST } = handlers;
// Or, if `handlers` isn't exported:
// const handler = NextAuth(authConfig);
// export { handler as GET, handler as POST };
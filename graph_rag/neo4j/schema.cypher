CREATE CONSTRAINT IF NOT EXISTS FOR (c:Customer) REQUIRE c.id IS UNIQUE;
CREATE CONSTRAINT IF NOT EXISTS FOR (p:Product) REQUIRE p.id IS UNIQUE;
CREATE CONSTRAINT IF NOT EXISTS FOR (i:Issue) REQUIRE i.id IS UNIQUE;
CREATE CONSTRAINT IF NOT EXISTS FOR (s:Solution) REQUIRE s.id IS UNIQUE;

MATCH (c:Customer {id: 'C001'})
MERGE (p:Product {id: 'P001', name: 'Enterprise Plan'})
MERGE (c)-[:PURCHASED {date: '2024-01-15'}]->(p);

MATCH (p:Product {id: 'P001'})
MERGE (i:Issue {id: 'I001', description: 'Login timeout errors'})
MERGE (p)-[:HAS_ISSUE]->(i);

MATCH (i:Issue {id: 'I001'})
MERGE (s:Solution {id: 'S001', steps: 'Clear browser cache, disable extensions, try incognito mode. If issue persists, contact support with screenshot.'})
MERGE (i)-[:SOLVED_BY]->(s);

MATCH (p:Product {id: 'P001'})
MERGE (i2:Issue {id: 'I002', description: 'Billing discrepancy on invoice'})
MERGE (p)-[:HAS_ISSUE]->(i2);

MATCH (i2:Issue {id: 'I002'})
MERGE (s2:Solution {id: 'S002', steps: 'Check invoice date range, verify user count, apply prorated credits. Contact billing@company.com for adjustments.'})
MERGE (i2)-[:SOLVED_BY]->(s2);

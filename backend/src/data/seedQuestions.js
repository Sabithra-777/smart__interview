const seedQuestions = {
  DSA: [
    { question: 'What is the time complexity of binary search?', options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'], correctAnswer: 'O(log n)' },
    { question: 'Which data structure uses LIFO?', options: ['Queue', 'Stack', 'Array', 'Tree'], correctAnswer: 'Stack' },
    { question: 'What is the worst case time complexity of Quick Sort?', options: ['O(n log n)', 'O(n²)', 'O(n)', 'O(log n)'], correctAnswer: 'O(n²)' },
    { question: 'Which traversal uses a queue?', options: ['Inorder', 'Preorder', 'Level Order', 'Postorder'], correctAnswer: 'Level Order' },
    { question: 'What is the space complexity of merge sort?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], correctAnswer: 'O(n)' },
    { question: 'Which data structure is used for BFS?', options: ['Stack', 'Queue', 'Tree', 'Graph'], correctAnswer: 'Queue' },
    { question: 'What is a complete binary tree?', options: ['All levels filled', 'All levels filled except last', 'Only root exists', 'Has one child'], correctAnswer: 'All levels filled except last' },
    { question: 'Hash table collision is resolved by?', options: ['Chaining', 'Sorting', 'Searching', 'Indexing'], correctAnswer: 'Chaining' },
    { question: 'DFS uses which data structure?', options: ['Queue', 'Stack', 'Array', 'List'], correctAnswer: 'Stack' },
    { question: 'Best case of bubble sort?', options: ['O(n²)', 'O(n)', 'O(log n)', 'O(1)'], correctAnswer: 'O(n)' }
  ],
  OS: [
    { question: 'What is a process?', options: ['Program in execution', 'Program on disk', 'CPU instruction', 'Memory block'], correctAnswer: 'Program in execution' },
    { question: 'Which scheduling algorithm is non-preemptive?', options: ['Round Robin', 'FCFS', 'Priority', 'Multilevel'], correctAnswer: 'FCFS' },
    { question: 'What causes deadlock?', options: ['Mutual exclusion', 'Hold and wait', 'No preemption', 'All of these'], correctAnswer: 'All of these' },
    { question: 'What is thrashing?', options: ['High paging activity', 'CPU scheduling', 'Memory allocation', 'Disk access'], correctAnswer: 'High paging activity' },
    { question: 'Which is fastest IPC?', options: ['Pipe', 'Message Queue', 'Shared Memory', 'Socket'], correctAnswer: 'Shared Memory' },
    { question: 'What is a semaphore?', options: ['Synchronization tool', 'Memory unit', 'CPU register', 'Disk block'], correctAnswer: 'Synchronization tool' },
    { question: 'Page replacement algorithm?', options: ['FIFO', 'LRU', 'Optimal', 'All of these'], correctAnswer: 'All of these' },
    { question: 'What is context switching?', options: ['Switching processes', 'Switching threads', 'Switching memory', 'Switching CPU'], correctAnswer: 'Switching processes' },
    { question: 'Virtual memory uses?', options: ['RAM', 'Hard Disk', 'Cache', 'Register'], correctAnswer: 'Hard Disk' },
    { question: 'Critical section problem solved by?', options: ['Mutex', 'Semaphore', 'Monitor', 'All of these'], correctAnswer: 'All of these' }
  ],
  DBMS: [
    { question: 'What is normalization?', options: ['Remove redundancy', 'Add redundancy', 'Delete data', 'Update data'], correctAnswer: 'Remove redundancy' },
    { question: 'ACID stands for?', options: ['Atomicity Consistency Isolation Durability', 'All Correct In Database', 'Atomic Clear Isolated Data', 'None'], correctAnswer: 'Atomicity Consistency Isolation Durability' },
    { question: 'Primary key can be NULL?', options: ['Yes', 'No', 'Sometimes', 'Depends'], correctAnswer: 'No' },
    { question: 'Which is DDL command?', options: ['SELECT', 'INSERT', 'CREATE', 'UPDATE'], correctAnswer: 'CREATE' },
    { question: 'Foreign key references?', options: ['Primary key', 'Unique key', 'Any key', 'No key'], correctAnswer: 'Primary key' },
    { question: 'What is a view?', options: ['Virtual table', 'Physical table', 'Index', 'Key'], correctAnswer: 'Virtual table' },
    { question: 'JOIN combines?', options: ['Rows', 'Columns', 'Tables', 'Databases'], correctAnswer: 'Tables' },
    { question: 'What is indexing?', options: ['Speed up queries', 'Slow down queries', 'Delete data', 'Insert data'], correctAnswer: 'Speed up queries' },
    { question: 'Transaction property?', options: ['ACID', 'BASE', 'CAP', 'SOLID'], correctAnswer: 'ACID' },
    { question: 'What is 3NF?', options: ['Third Normal Form', 'Three Node Form', 'Triple Null Form', 'None'], correctAnswer: 'Third Normal Form' }
  ],
  CN: [
    { question: 'OSI model has how many layers?', options: ['5', '6', '7', '8'], correctAnswer: '7' },
    { question: 'TCP is?', options: ['Connection-oriented', 'Connectionless', 'Both', 'None'], correctAnswer: 'Connection-oriented' },
    { question: 'IP address size in IPv4?', options: ['16 bits', '32 bits', '64 bits', '128 bits'], correctAnswer: '32 bits' },
    { question: 'Which layer has routing?', options: ['Physical', 'Data Link', 'Network', 'Transport'], correctAnswer: 'Network' },
    { question: 'HTTP uses which port?', options: ['21', '22', '80', '443'], correctAnswer: '80' },
    { question: 'DNS converts?', options: ['Name to IP', 'IP to Name', 'Both', 'None'], correctAnswer: 'Name to IP' },
    { question: 'Which is connection-less?', options: ['TCP', 'UDP', 'FTP', 'HTTP'], correctAnswer: 'UDP' },
    { question: 'MAC address size?', options: ['32 bits', '48 bits', '64 bits', '128 bits'], correctAnswer: '48 bits' },
    { question: 'Which protocol is reliable?', options: ['UDP', 'TCP', 'IP', 'ICMP'], correctAnswer: 'TCP' },
    { question: 'Subnet mask for Class C?', options: ['255.0.0.0', '255.255.0.0', '255.255.255.0', '255.255.255.255'], correctAnswer: '255.255.255.0' }
  ],
  Aptitude: [
    { question: 'If 20% of x is 40, what is x?', options: ['100', '150', '200', '250'], correctAnswer: '200' },
    { question: 'A train travels 60 km in 1 hour. Speed?', options: ['50 km/h', '60 km/h', '70 km/h', '80 km/h'], correctAnswer: '60 km/h' },
    { question: 'Simple interest on 1000 at 5% for 2 years?', options: ['50', '100', '150', '200'], correctAnswer: '100' },
    { question: 'Average of 10, 20, 30?', options: ['15', '20', '25', '30'], correctAnswer: '20' },
    { question: 'If A:B = 2:3 and B:C = 4:5, then A:C?', options: ['8:15', '2:5', '3:5', '4:5'], correctAnswer: '8:15' },
    { question: '25% of 80 is?', options: ['15', '20', '25', '30'], correctAnswer: '20' },
    { question: 'LCM of 12 and 18?', options: ['36', '48', '54', '72'], correctAnswer: '36' },
    { question: 'HCF of 24 and 36?', options: ['6', '8', '12', '18'], correctAnswer: '12' },
    { question: 'If x + 5 = 12, x = ?', options: ['5', '6', '7', '8'], correctAnswer: '7' },
    { question: 'Square root of 144?', options: ['10', '11', '12', '13'], correctAnswer: '12' }
  ]
};

module.exports = seedQuestions;

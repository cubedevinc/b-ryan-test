cube(`Orders`, {
  sql: `SELECT * FROM public.orders`,
  preAggregations: {// Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started

    main: {
      measures: [Orders.count],
      dimensions: [Orders.status],
      timeDimension: Orders.createdAt,
      granularity: `week`,
      partitionGranularity: `month`,
      refreshKey: {
        //sql: `SELECT MAX(created_at) FROM Orders`,
        every: `1 minute`,
        incremental: true,
        updateWindow: `2 month`,
      },
    },

    mainNoPartitions: {
      measures: [Orders.count],
      dimensions: [Orders.status],
      timeDimension: Orders.completedAt,
      granularity: `week`
    }
    
  },
  joins: {},
  measures: {
    count: {
      type: `count`,
      drillMembers: [id, createdAt]
    },
    number: {
      sql: `number`,
      type: `sum`
    }
  },
  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true
    },
    status: {
      sql: `status`,
      type: `string`
    },
    createdAt: {
      sql: `created_at`,
      type: `time`
    },
    completedAt: {
      sql: `completed_at`,
      type: `time`
    }
  },
  dataSource: `default`
});
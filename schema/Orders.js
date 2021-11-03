cube(`Orders`, {
  sql: `SELECT * FROM public.orders`,
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started
    rollupCreatedAt: {
      measures: [Orders.count],
      dimensions: [Orders.status],
      refreshKey: {
        every: `1 hour`,
        updateWindow: `1 day`,
        incremental: true
      },
      partitionGranularity: `month`,
      timeDimension: Orders.createdAt,
      granularity: `day`
    },
    rollupSumMonthly: {
      measures: [Orders.number],
      timeDimension: Orders.completedAt,
      granularity: `month`
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

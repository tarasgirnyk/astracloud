Comparison-style pricing table — plan rows × spec columns (CPU, RAM, disk, price), one highlighted "recommended" row. Pair with `Tabs` (service type) and `Tag` (location/config filters) above it.

```jsx
<PricingTable
  columns={[{key:'plan',label:'Тариф'},{key:'cpu',label:'CPU'},{key:'ram',label:'RAM'},{key:'disk',label:'Диск'},{key:'price',label:'Ціна'}]}
  rows={[{plan:'N-START', cpu:'1', ram:'1 GB', disk:'20 GB NVMe', price:'99₴/міс'}]}
  highlightRow="N-BASIC"
/>
```

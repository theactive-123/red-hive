// Short, realistic code samples shown on each technology page.
export const snippets: Record<string, { file: string; lang: string; code: string }> = {
  "react": {
    file: "InvoiceList.tsx",
    lang: "TSX",
    code: "export function InvoiceList({ invoices }: Props) {\n  const [filter, setFilter] = useState<Status>(\"open\");\n  const visible = useMemo(\n    () => invoices.filter((i) => i.status === filter),\n    [invoices, filter],\n  );\n\n  return (\n    <section>\n      <StatusTabs value={filter} onChange={setFilter} />\n      {visible.map((inv) => (\n        <InvoiceRow key={inv.id} invoice={inv} />\n      ))}\n    </section>\n  );\n}",
  },
  "nextjs": {
    file: "app/orders/page.tsx",
    lang: "TSX",
    code: "import { getOrders } from \"@/lib/orders\";\n\nexport const revalidate = 60;\n\nexport default async function OrdersPage() {\n  const orders = await getOrders({ limit: 20 });\n\n  return (\n    <main className=\"p-8\">\n      <h1>Recent orders</h1>\n      <OrdersTable rows={orders} />\n    </main>\n  );\n}",
  },
  "vuejs": {
    file: "BookingForm.vue",
    lang: "Vue",
    code: "<script setup lang=\"ts\">\nimport { ref, computed } from \"vue\";\n\nconst guests = ref(2);\nconst nights = ref(3);\nconst total = computed(() => guests.value * nights.value * 89);\n</script>\n\n<template>\n  <form @submit.prevent=\"$emit('book', total)\">\n    <input v-model.number=\"guests\" type=\"number\" min=\"1\" />\n    <p>Total: ${{ total }}</p>\n  </form>\n</template>",
  },
  "angular": {
    file: "patients.component.ts",
    lang: "TypeScript",
    code: "@Component({\n  selector: \"app-patients\",\n  standalone: true,\n  templateUrl: \"./patients.component.html\",\n})\nexport class PatientsComponent {\n  private api = inject(PatientsService);\n  query = signal(\"\");\n\n  patients = toSignal(\n    toObservable(this.query).pipe(\n      debounceTime(250),\n      switchMap((q) => this.api.search(q)),\n    ),\n  );\n}",
  },
  "typescript": {
    file: "money.ts",
    lang: "TypeScript",
    code: "type Currency = \"USD\" | \"GBP\" | \"EUR\";\n\nexport type Money = {\n  readonly amount: number; // minor units\n  readonly currency: Currency;\n};\n\nexport function add(a: Money, b: Money): Money {\n  if (a.currency !== b.currency) {\n    throw new Error(\"Currency mismatch\");\n  }\n  return { amount: a.amount + b.amount, currency: a.currency };\n}",
  },
  "flutter": {
    file: "booking_card.dart",
    lang: "Dart",
    code: "class BookingCard extends StatelessWidget {\n  const BookingCard({super.key, required this.booking});\n  final Booking booking;\n\n  @override\n  Widget build(BuildContext context) {\n    return ListTile(\n      title: Text(booking.doctorName),\n      subtitle: Text(DateFormat.jm().format(booking.time)),\n      trailing: FilledButton(\n        onPressed: () => context.push('/call/${booking.id}'),\n        child: const Text('Join'),\n      ),\n    );\n  }\n}",
  },
  "react-native": {
    file: "OrdersScreen.tsx",
    lang: "TSX",
    code: "export function OrdersScreen() {\n  const { data, refetch, isRefetching } = useQuery({\n    queryKey: [\"orders\"],\n    queryFn: api.orders.list,\n  });\n\n  return (\n    <FlatList\n      data={data ?? []}\n      keyExtractor={(o) => o.id}\n      renderItem={({ item }) => <OrderRow order={item} />}\n      onRefresh={refetch}\n      refreshing={isRefetching}\n    />\n  );\n}",
  },
  "swift": {
    file: "VisitView.swift",
    lang: "Swift",
    code: "struct VisitView: View {\n  @StateObject private var model = VisitModel()\n\n  var body: some View {\n    List(model.visits) { visit in\n      VStack(alignment: .leading) {\n        Text(visit.doctor).font(.headline)\n        Text(visit.date, style: .time)\n          .foregroundStyle(.secondary)\n      }\n    }\n    .task { await model.load() }\n    .refreshable { await model.load() }\n  }\n}",
  },
  "kotlin": {
    file: "TripViewModel.kt",
    lang: "Kotlin",
    code: "@HiltViewModel\nclass TripViewModel @Inject constructor(\n  private val repo: TripRepository,\n) : ViewModel() {\n\n  val trips: StateFlow<List<Trip>> = repo.observeTrips()\n    .stateIn(\n      viewModelScope,\n      SharingStarted.WhileSubscribed(5_000),\n      emptyList(),\n    )\n\n  fun cancel(id: String) = viewModelScope.launch {\n    repo.cancel(id)\n  }\n}",
  },
  "ionic": {
    file: "tasks.page.html",
    lang: "HTML",
    code: "<ion-header>\n  <ion-toolbar>\n    <ion-title>Today</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-refresher slot=\"fixed\" (ionRefresh)=\"reload($event)\">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n  <ion-list>\n    <ion-item *ngFor=\"let task of tasks\" detail>\n      <ion-label>{{ task.title }}</ion-label>\n    </ion-item>\n  </ion-list>\n</ion-content>",
  },
  "nodejs": {
    file: "routes/signup.ts",
    lang: "TypeScript",
    code: "const Signup = z.object({\n  email: z.string().email(),\n  password: z.string().min(10),\n  company: z.string().max(80),\n});\n\napp.post(\"/api/signup\", async (req, res) => {\n  const body = Signup.safeParse(req.body);\n  if (!body.success) {\n    return res.status(422).json(body.error.flatten());\n  }\n  const user = await users.create(body.data);\n  res.status(201).json({ id: user.id });\n});",
  },
  "nestjs": {
    file: "invoices.controller.ts",
    lang: "TypeScript",
    code: "@Controller(\"invoices\")\n@UseGuards(JwtAuthGuard, TenantGuard)\nexport class InvoicesController {\n  constructor(private readonly invoices: InvoicesService) {}\n\n  @Get()\n  list(@Tenant() tenantId: string, @Query() q: ListDto) {\n    return this.invoices.list(tenantId, q);\n  }\n\n  @Post(\":id/send\")\n  send(@Tenant() tenantId: string, @Param(\"id\") id: string) {\n    return this.invoices.send(tenantId, id);\n  }\n}",
  },
  "python": {
    file: "reports.py",
    lang: "Python",
    code: "@dataclass(frozen=True)\nclass DailyTotal:\n    day: date\n    orders: int\n    revenue_cents: int\n\n\ndef summarise(rows: list[dict]) -> list[DailyTotal]:\n    by_day: dict[date, list[dict]] = {}\n    for row in rows:\n        by_day.setdefault(row[\"day\"], []).append(row)\n    return [\n        DailyTotal(d, len(r), sum(x[\"total\"] for x in r))\n        for d, r in sorted(by_day.items())\n    ]",
  },
  "django": {
    file: "listings/views.py",
    lang: "Python",
    code: "class ListingViewSet(viewsets.ModelViewSet):\n    serializer_class = ListingSerializer\n    permission_classes = [IsAuthenticated, IsAgentOrReadOnly]\n    filterset_fields = [\"city\", \"bedrooms\", \"status\"]\n\n    def get_queryset(self):\n        return (\n            Listing.objects.filter(agency=self.agency)\n            .select_related(\"agent\")\n            .prefetch_related(\"photos\")\n            .order_by(\"-created_at\")\n        )\n\n    def perform_create(self, serializer):\n        serializer.save(agency=self.agency)",
  },
  "fastapi": {
    file: "main.py",
    lang: "Python",
    code: "app = FastAPI()\n\n\nclass Quote(BaseModel):\n    pickup: str\n    dropoff: str\n    weight_kg: float = Field(gt=0, le=2000)\n\n\n@app.post(\"/quotes\")\nasync def create_quote(q: Quote, db: DB = Depends(get_db)):\n    km = await routing.distance(q.pickup, q.dropoff)\n    price = round(4.5 + km * 1.2 + q.weight_kg * 0.05, 2)\n    row = await db.quotes.insert(**q.model_dump(), price=price)\n    return {\"id\": row.id, \"price\": price}",
  },
  "laravel": {
    file: "OrderController.php",
    lang: "PHP",
    code: "class OrderController extends Controller\n{\n    public function store(StoreOrderRequest $request)\n    {\n        $data = $request->validated();\n        $order = DB::transaction(fn () => tap(\n            $request->user()->orders()->create($data),\n            fn ($o) => $o->items()->createMany($data['items']),\n        ));\n\n        OrderPlaced::dispatch($order);\n\n        return new OrderResource($order);\n    }\n}",
  },
  "dotnet": {
    file: "ShipmentsEndpoints.cs",
    lang: "C#",
    code: "app.MapGet(\"/shipments/{id:guid}\", async (\n    Guid id, AppDb db, CancellationToken ct) =>\n{\n    var shipment = await db.Shipments\n        .AsNoTracking()\n        .Include(s => s.Events)\n        .FirstOrDefaultAsync(s => s.Id == id, ct);\n\n    return shipment is null\n        ? Results.NotFound()\n        : Results.Ok(ShipmentDto.From(shipment));\n})\n.RequireAuthorization(\"dispatch\");",
  },
  "golang": {
    file: "tracker.go",
    lang: "Go",
    code: "func (s *Server) ping(w http.ResponseWriter, r *http.Request) {\n  var p Ping\n  if err := json.NewDecoder(r.Body).Decode(&p); err != nil {\n    http.Error(w, \"bad payload\", http.StatusBadRequest)\n    return\n  }\n  p.ReceivedAt = time.Now().UTC()\n\n  select {\n  case s.pings <- p:\n    w.WriteHeader(http.StatusAccepted)\n  default:\n    http.Error(w, \"busy\", http.StatusServiceUnavailable)\n  }\n}",
  },
  "postgresql": {
    file: "0007_invoices.sql",
    lang: "SQL",
    code: "CREATE TABLE invoices (\n  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),\n  tenant_id   uuid NOT NULL REFERENCES tenants(id),\n  number      text NOT NULL,\n  status      text NOT NULL DEFAULT 'draft',\n  total_cents bigint NOT NULL CHECK (total_cents >= 0),\n  due_on      date,\n  created_at  timestamptz NOT NULL DEFAULT now(),\n  UNIQUE (tenant_id, number)\n);\n\nCREATE INDEX invoices_open_idx\n  ON invoices (tenant_id, due_on)\n  WHERE status = 'open';",
  },
  "mongodb": {
    file: "activity.ts",
    lang: "TypeScript",
    code: "const feed = await db.collection(\"events\").aggregate([\n  { $match: { workspaceId, createdAt: { $gte: since } } },\n  { $sort: { createdAt: -1 } },\n  {\n    $group: {\n      _id: \"$userId\",\n      lastSeen: { $first: \"$createdAt\" },\n      actions: { $sum: 1 },\n    },\n  },\n  { $limit: 50 },\n]).toArray();",
  },
  "mysql": {
    file: "top_products.sql",
    lang: "SQL",
    code: "SELECT p.sku,\n       p.name,\n       SUM(oi.quantity)           AS units,\n       SUM(oi.quantity * oi.price) AS revenue\nFROM order_items oi\nJOIN products p ON p.id = oi.product_id\nJOIN orders o   ON o.id = oi.order_id\nWHERE o.status = 'paid'\n  AND o.created_at >= CURDATE() - INTERVAL 30 DAY\nGROUP BY p.sku, p.name\nORDER BY revenue DESC\nLIMIT 20;",
  },
  "redis": {
    file: "rateLimit.ts",
    lang: "TypeScript",
    code: "export async function rateLimit(key: string, limit = 60) {\n  const minute = Math.floor(Date.now() / 60_000);\n  const bucket = `rl:${key}:${minute}`;\n  const count = await redis.incr(bucket);\n\n  if (count === 1) {\n    await redis.expire(bucket, 60);\n  }\n\n  return {\n    allowed: count <= limit,\n    remaining: Math.max(0, limit - count),\n  };\n}",
  },
  "firebase": {
    file: "chat.ts",
    lang: "TypeScript",
    code: "export function watchMessages(roomId: string, cb: Listener) {\n  const q = query(\n    collection(db, \"rooms\", roomId, \"messages\"),\n    orderBy(\"sentAt\", \"desc\"),\n    limit(50),\n  );\n\n  return onSnapshot(q, (snap) => {\n    const messages = snap.docs.map((d) => ({\n      id: d.id,\n      ...(d.data() as Message),\n    }));\n    cb(messages.reverse());\n  });\n}",
  },
  "supabase": {
    file: "projects.ts",
    lang: "TypeScript",
    code: "const { data: projects, error } = await supabase\n  .from(\"projects\")\n  .select(\"id, name, owner:profiles(full_name), tasks(count)\")\n  .eq(\"team_id\", teamId)\n  .order(\"updated_at\", { ascending: false })\n  .limit(25);\n\nif (error) throw error;\n\nsupabase\n  .channel(\"projects\")\n  .on(\"postgres_changes\", { event: \"*\", schema: \"public\" },\n    refresh)\n  .subscribe();",
  },
  "graphql": {
    file: "schema.graphql",
    lang: "GraphQL",
    code: "type Shipment {\n  id: ID!\n  reference: String!\n  status: ShipmentStatus!\n  driver: Driver\n  events(last: Int = 10): [TrackingEvent!]!\n}\n\ntype Query {\n  shipment(id: ID!): Shipment\n  shipments(status: ShipmentStatus, first: Int): [Shipment!]!\n}\n\ntype Mutation {\n  assignDriver(shipmentId: ID!, driverId: ID!): Shipment!\n}",
  },
  "aws": {
    file: "api-stack.ts",
    lang: "TypeScript",
    code: "export class ApiStack extends Stack {\n  constructor(scope: Construct, id: string, p?: StackProps) {\n    super(scope, id, p);\n    const table = new dynamodb.TableV2(this, \"Orders\", {\n      partitionKey: { name: \"pk\", type: AttributeType.STRING },\n    });\n\n    const fn = new NodejsFunction(this, \"OrdersFn\", {\n      entry: \"src/orders.ts\",\n      environment: { TABLE: table.tableName },\n    });\n    table.grantReadWriteData(fn);\n    new HttpApi(this, \"Api\", { defaultIntegration: fn });\n  }\n}",
  },
  "google-cloud": {
    file: "cloudbuild.yaml",
    lang: "YAML",
    code: "steps:\n  - name: gcr.io/cloud-builders/docker\n    args: [\"build\", \"-t\", \"$_IMAGE:$SHORT_SHA\", \".\"]\n  - name: gcr.io/cloud-builders/docker\n    args: [\"push\", \"$_IMAGE:$SHORT_SHA\"]\n  - name: gcr.io/google.com/cloudsdktool/cloud-sdk\n    entrypoint: gcloud\n    args:\n      - run\n      - deploy\n      - api\n      - --image=$_IMAGE:$SHORT_SHA\n      - --region=europe-west2",
  },
  "azure": {
    file: "main.bicep",
    lang: "Bicep",
    code: "param location string = resourceGroup().location\nparam appName string\n\nresource plan 'Microsoft.Web/serverfarms@2023-01-01' = {\n  name: '${appName}-plan'\n  location: location\n  sku: { name: 'P1v3' }\n}\n\nresource app 'Microsoft.Web/sites@2023-01-01' = {\n  name: appName\n  location: location\n  properties: { serverFarmId: plan.id, httpsOnly: true }\n}",
  },
  "docker": {
    file: "Dockerfile",
    lang: "Dockerfile",
    code: "FROM node:22-alpine AS deps\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\n\nFROM node:22-alpine AS build\nWORKDIR /app\nCOPY --from=deps /app/node_modules ./node_modules\nCOPY . .\nRUN npm run build\n\nFROM node:22-alpine\nWORKDIR /app\nENV NODE_ENV=production\nCOPY --from=build /app/dist ./dist\nCMD [\"node\", \"dist/server.js\"]",
  },
  "kubernetes": {
    file: "api-deployment.yaml",
    lang: "YAML",
    code: "apiVersion: apps/v1\nkind: Deployment\nmetadata: { name: api }\nspec:\n  replicas: 3\n  selector:\n    matchLabels: { app: api }\n  template:\n    metadata: { labels: { app: api } }\n    spec:\n      containers:\n        - name: api\n          image: registry.example.com/api:1.8.2\n          ports: [{ containerPort: 8080 }]\n          readinessProbe:\n            httpGet: { path: /healthz, port: 8080 }",
  },
  "openai": {
    file: "summarise.ts",
    lang: "TypeScript",
    code: "const res = await openai.chat.completions.create({\n  model: \"gpt-4.1-mini\",\n  response_format: { type: \"json_object\" },\n  messages: [\n    {\n      role: \"system\",\n      content: \"Summarise support tickets. Reply as JSON: \" +\n        \"{ summary: string, priority: 'low'|'high' }\",\n    },\n    { role: \"user\", content: ticket.body },\n  ],\n});\n\nconst result = TicketSummary.parse(\n  JSON.parse(res.choices[0].message.content ?? \"{}\"),\n);",
  },
  "langchain": {
    file: "answer.py",
    lang: "Python",
    code: "retriever = vectorstore.as_retriever(search_kwargs={\"k\": 4})\n\nprompt = ChatPromptTemplate.from_template(\n    \"Answer using only this context:\\n{context}\\n\\n\"\n    \"Question: {question}\"\n)\n\nchain = (\n    {\"context\": retriever | format_docs,\n     \"question\": RunnablePassthrough()}\n    | prompt\n    | ChatOpenAI(model=\"gpt-4.1-mini\", temperature=0)\n    | StrOutputParser()\n)\n\nanswer = chain.invoke(\"Which listings allow pets?\")",
  },
  "shopify": {
    file: "featured-collection.liquid",
    lang: "Liquid",
    code: "<section class=\"featured\">\n  <h2>{{ section.settings.heading }}</h2>\n  <ul class=\"grid\">\n    {% assign items = section.settings.collection.products %}\n    {% for product in items limit: 4 %}\n      <li>\n        <a href=\"{{ product.url }}\">\n          {{ product.featured_image | image_url: width: 600\n             | image_tag: loading: 'lazy' }}\n          <span>{{ product.title }}</span>\n          <span>{{ product.price | money }}</span>\n        </a>\n      </li>\n    {% endfor %}\n  </ul>\n</section>",
  },
  "wordpress": {
    file: "case-studies.php",
    lang: "PHP",
    code: "add_action('init', function () {\n    register_post_type('case_study', [\n        'label'        => 'Case studies',\n        'public'       => true,\n        'has_archive'  => true,\n        'rewrite'      => ['slug' => 'work'],\n        'show_in_rest' => true,\n        'menu_icon'    => 'dashicons-portfolio',\n        'supports'     => ['title', 'editor', 'thumbnail'],\n    ]);\n});",
  },
  "strapi": {
    file: "article.ts",
    lang: "TypeScript",
    code: "export default factories.createCoreController(\n  \"api::article.article\",\n  ({ strapi }) => ({\n    async findBySlug(ctx) {\n      const { slug } = ctx.params;\n      const docs = strapi.documents(\"api::article.article\");\n      const entry = await docs.findFirst({\n          filters: { slug },\n          populate: [\"cover\", \"author\"],\n          status: \"published\",\n        });\n      if (!entry) return ctx.notFound();\n      return this.transformResponse(entry);\n    },\n  }),\n);",
  },
};

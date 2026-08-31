import StyledButton from "@/components/commonComponents/StyledButton";

export default function ProductNotFoundScreen() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center sm:px-6">
      <h1>Product not found</h1>
      <p className="mt-4 text-zinc-500">
        This product is not in our catalog. Browse the full range below.
      </p>
      <StyledButton href="/products" size="md" className="mt-8">
        View all products
      </StyledButton>
    </div>
  );
}
